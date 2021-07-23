import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, //porcess is from the vs code itself
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  })
  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug },
    }
  })

  //returns an array of objects that are the different paths

  return {
    paths: paths,
  }
}

export default function RecipeDetails() {
  // finding out all the paths and routes that will use this component as their page
  return <div>Recipe Details</div>
}
