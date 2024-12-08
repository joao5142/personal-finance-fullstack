export function usePagination() {
  const pagination = ref({
    page: 1,
    limit: 5,
    final_page: 5,
  })

  function paginationNextPage() {
    if (pagination.value.page < pagination.value.final_page) {
      pagination.value.page++
    }
  }
  function paginationPrevPage() {
    if (pagination.value.page > 1) {
      pagination.value.page--
    }
  }

  return {
    pagination,
    paginationNextPage,
    paginationPrevPage,
  }
}
