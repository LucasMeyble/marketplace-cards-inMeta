const getters = {
  getCards: (state: any) => state.cards,
  isLoading: (state: any) => state.loading,
  more: (state: any) => state.more,
  currentPage: (state: any) => state.page
}

export default {...getters}