import { IEvent } from '@/services/models/IEvent'

export interface EventsGroup {
    [key: string]: IEvent[]
}