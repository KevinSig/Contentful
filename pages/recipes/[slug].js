import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, //porcess is from the vs code itself
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  // this is done at build time to get generate the paths

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
    fallback: true, //dont return 404, instead return fallback , it re-runs get static props
  }
}

export async function getStaticProps({ params }) {
  // this is to fetch a single page, and will ingject into Recipe Details
  // get params from the context
  //destructuring to get items from the array
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  })
  return {
    props: { recipe: items[0], AMIR: 'HI' },
    revalidate: 1,
  }

  //only after 10 seconds does it reach out to the content storge
}

export default function RecipeDetails({ recipe, AMIR }) {
  console.log(AMIR)
  console.log(recipe)
  // finding out all the paths and routes that will use this component as their page

  if (!recipe) return <Skeleton />

  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields
  return (
    <div>
      <div className='banner'>
        <Image
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <div className='info'>
        <p> Takes about {cookingTime} minutes</p>
        <h3>Ingredients</h3>
        {ingredients.map(ingredient => (
          <span key={ingredient}>{ingredient}</span>
        ))}
      </div>

      <div className='method'>
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ', ';
        }
        .info span:last-child::after {
          content: '.';
        }
      `}</style>
    </div>
  )
}
