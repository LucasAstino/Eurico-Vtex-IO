const HandleAddToCartObj = (randomProduct : any) => {

    const cart = [
        {
          additionalInfo: {
            brandName: randomProduct.brand,
            __typename: 'ItemAdditionalInfo',
          },
          availability: randomProduct.items[0].sellers[0].commertialOffer.IsAvailable,
          id: randomProduct.items[0].itemId,
          imageUrls: {
            at1x: randomProduct.items[0].images[0].imageUrl,
            __typename: 'ImageUrls',
          },
          listPrice: randomProduct.items[0].sellers[0].commertialOffer.ListPrice,
          measurementUnit: randomProduct.items[0].measurementUnit,
          name: randomProduct.productName,
          price: randomProduct.items[0].sellers[0].commertialOffer.Price,
          productId: randomProduct.productId,
          quantity: 1,
          seller: randomProduct.items[0].sellers[0].sellerId,
          sellingPrice: randomProduct.items[0].bestPrice,
          skuName: randomProduct.items[0].nameComplete,
          unitMultiplier: randomProduct.items[0].unitMultiplier,
          uniqueId: randomProduct.items[0].itemId,
          isGift: false,
          __typename: 'Item',
        }
      ]

    return cart

}


export default HandleAddToCartObj;
