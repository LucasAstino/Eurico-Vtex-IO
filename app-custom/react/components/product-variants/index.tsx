import React from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

export const HANDLES_VARIANTS = [
  'similar__products-variants',
  'similar__products-variants--title',
  'variant-type',
  'similar__products-variants--wrap',
  'similar__products-variants--img',
  'similar__products-variants--img-current',
  'similar__products-variants--link',
  'similar__image-container',
  'similar__image-container--current',
] as const

import productRecommendationsQuery from '../../queries/productRecommendations.gql'

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string
    }
  },
  imageLabel: string
}

export function SimilarProductsVariants({
  productQuery,
  imageLabel
}: SimilarProductsVariantsProps) {
  const { handles } = useCssHandles(HANDLES_VARIANTS)
  const product = useProduct()
  const productCurrentImg = product?.selectedItem?.images[0].imageUrl
  const productCurrentImgAlt = product?.selectedItem?.images[0].imageText
  const colorProperty = product?.product?.properties?.find(property => property.name === 'Cor');
  const color = colorProperty?.values?.[0] || 'N/A';
  const productContext = useProduct()
  const { route } = useRuntime()

  console.log('here', product);
  const productId =
    productQuery?.product?.productId ?? productContext?.product?.productId

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: 'id', value: productId },
      type: `similars`,
    },
    skip: !productId,
  })

  if (loading || error) return null

  const { productRecommendations } = data

  const { products } = {
    products: productRecommendations || [],
  }

  const unique = [
    ...new Set<string>(
      products.map((item: ProductTypes.Product) => item.productId)
    ),
  ]

  const items: ProductTypes.Product[] = []

  unique.forEach(id => {
    const item = products.find(
      (element: ProductTypes.Product) => element.productId === id
    )

    if (item) items.push(item)
  })

  if (items.length === 0) {
    return (
      <div className={handles['similar__products-variants']}>
        <p className={handles['similar__products-variants--title']}>
          Cor: <span className={handles['variant-type']}>{color}</span>
        </p>
        <div className={handles['similar__products-variants--wrap']}>
          <div className={`${handles['similar__image-container']} ${handles['similar__image-container--current']}`}>
            <img
              src={productCurrentImg}
              alt={productCurrentImgAlt}
              height="50px"
              className={`${handles['similar__products-variants--img']} ${handles['similar__products-variants--img-current']} mr3`}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={handles['similar__products-variants']}>
      <p className={handles['similar__products-variants--title']}>
        Cor: <span className={handles['variant-type']}>{color}</span>
      </p>
      <div className={handles['similar__products-variants--wrap']}>
        <div className={`${handles['similar__image-container']} ${handles['similar__image-container--current']}`}>
          <img
            src={productCurrentImg}
            alt={productCurrentImgAlt}
            height="50px"
            className={`${handles['similar__products-variants--img']} ${handles['similar__products-variants--img-current']} mr3`}
          />
        </div>
        {items.map((element: ProductTypes.Product) => {
          const imageIndex = imageLabel === undefined
            ? 0
            : element.items[0].images.findIndex(image => image.imageLabel === imageLabel) === -1
              ? 0
              : element.items[0].images.findIndex(image => image.imageLabel === imageLabel)

          const srcImage = element.items[0].images[imageIndex].imageUrl
          return (
            <Link
              key={element.productId}
              className={`${handles['similar__products-variants--link']} ${route?.params?.slug === element.linkText ? '--is-active' : ''}`}
              page="store.product"
              params={{
                slug: element?.linkText,
                id: element?.productId,
              }}
            >
              <div className={handles['similar__image-container']}>
                <img
                  src={srcImage}
                  alt={element.productName}
                  height="50px"
                  className={`${handles['similar__products-variants--img']} mr3 ${route?.params?.slug === element.linkText ? 'o-50' : ''}`}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

SimilarProductsVariants.schema = {
  title: 'SimilarProducts Variants',
  description: 'SimilarProducts Variants',
  type: 'object',
  properties: {},
}
