<template>
  <div>
    <div v-for="session in userSessions" :key="session">
      <CartContainer :sessionData="session" />
    </div>
    <AddProductModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import CartContainer from '@/components/CartContainer.vue'
import AddProductModal from '@/components/AddProductModal.vue'
import { EventsGroup } from '@/services/models/EventsGroup'
import { IEvent } from '@/services/models/IEvent'
import { ITrunstile } from '@/services/models/ITrunstile'
import { IProductCartItem } from '@/services/models/IProductCartItem'
import events from '@/services/mocks/events.json'
import trunstileEvents from '@/services/mocks/trunstile-events.json'

export default defineComponent({
  name: 'SessionsContainer',
  components: {
    CartContainer,
    AddProductModal
  },
  mounted () {
    this.addEventsToStore()
    this.userSessions = this.sessions
  },
  data () {
    return {
      userSessions: []
    }
  },
  computed: {
    ...mapState([
      'sessions'
    ])
  },
  methods: {
    addEventsToStore () {
      // Parse Events
      const parsedEvents = this.parseEvents()
      // Count Products
      for (const key in parsedEvents) {
        const products = this.countProducts(parsedEvents[key])
        const sessionData = {
          sessionId: key,
          alias: Math.floor(Math.random() * 100000),
          isSubmitted: false,
          trunstile: trunstileEvents.filter((item: ITrunstile) => item.sessionId === key),
          products
        }

        this.$store.commit('addSessionStub', sessionData)
      }
    },
    parseEvents () {
      const groupedEvents: EventsGroup = {}

      events.map(item => {
        if (!(item.sessionId in groupedEvents)) {
          groupedEvents[item.sessionId] = [parseEventItem(item)]
        } else {
          groupedEvents[item.sessionId].push(parseEventItem(item))
        }
      })

      function parseEventItem (item: IEvent) {
        return {
          id: item.id,
          productCount: item.productCount,
          productName: item.productName,
          sessionId: item.sessionId,
          timestamp: item.timestamp,
          trackId: item.trackId,
          type: item.type
        }
      }

      return groupedEvents
    },

    countProducts (eventsGroup: IEvent[]) {
      const result: IProductCartItem[] = []

      groupSimilarItems(eventsGroup)

      function groupSimilarItems (eventsGroup: IEvent[]) {
        if (!eventsGroup.length) {
          return
        }
        const subResult: IEvent[] = eventsGroup.filter((elem: IEvent) => elem.productName === eventsGroup[0].productName)
        const productQty: number = parseSubResult(subResult)
        if (productQty > 0) {
          result.push({
            productName: eventsGroup[0].productName,
            productCount: productQty
          })
        }

        const cleared: IEvent[] = eventsGroup.filter((elem: IEvent) => elem.productName !== eventsGroup[0].productName)
        groupSimilarItems(cleared)
      }

      function parseSubResult (subResult: IEvent[]) {
        let count = 0
        subResult.map((item: IEvent) => {
          count += -item.productCount
        })
        return count
      }
      return result
    }
  }
})
</script>
