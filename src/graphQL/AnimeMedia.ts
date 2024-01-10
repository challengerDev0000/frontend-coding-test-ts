export const mediaList_payload = (page: number, perPage: number) => ({
  query: `
    query ($page: Int, $perPage: Int) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					total
					currentPage
					lastPage
					hasNextPage
					perPage
				}
				media(type: ANIME) {
					id
					title {
						romaji
						english
						native
					}
					popularity
					coverImage {
						medium
					}
				}
			}
    } 
    `,
  variables: {
    page,
    perPage,
  },
})

export const mediaDetail_payload = (id: number) => ({
  query: `
	query ($id: Int) { 
		Media (id: $id, type: ANIME) { 
			id
			title {
				romaji
				english
				native
			}
			type
			popularity
			coverImage {
				medium
			}
			chapters
			volumes
			bannerImage
			favourites
		}
	}
	`,
  variables: {
    id,
  },
})
