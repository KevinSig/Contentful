import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'
import styled from 'styled-components'

export async function getStaticProps() {
  //this is the function to grab data and inject that as props
  // this connects to the speci contentful space

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID, //porcess is from the vs code itself
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'recipe' })

  return {
    props: {
      recipes: res.items,
      revalidate: 1,
    },
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px 60px;
`

export default function Recipes({ recipes }) {
  return (
    <Grid>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </Grid>
  )
}
