import Api from '@/services/Api'

export default {
  getEvents () {
    return Api().get('events')
  },
  saveEvent(event){
    return Api().post('events',event);
  }
}
