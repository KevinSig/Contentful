import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'
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
    },
  }
}

export default function Recipes({ recipes }) {
  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  )
}
