export const state = () => ({})

export const actions = {
  async addImpression({}, channel) {
    const impressionsRef = this.$fire.firestore.collection('impressions')
    const channelRef = impressionsRef.doc(channel)
    const channelSnapshot = await channelRef.get()
    await channelRef.set({
      clicks: channelSnapshot.data().clicks + 1,
    })
    console.log('updated impression for ' + channel)
  },
}
