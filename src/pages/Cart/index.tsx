import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View, Text } from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  const cartTotal = useMemo(() => {
    const cart = products.reduce(
      (accumualtor, product) => {
        accumualtor.total += Number(product.price) * Number(product.quantity);

        return accumualtor;
      },
      {
        total: 0,
      },
    );

    return formatValue(cart.total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const cart = products.reduce(
      (accumualtor, product) => {
        accumualtor.itens += Number(product.quantity);

        return accumualtor;
      },
      {
        itens: 0,
      },
    );

    return cart.itens;
  }, [products]);

  return (
    <Container>
      <ProductContainer>
        {products.length > 0 ? (
          <ProductList
            data={products}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({ item }: { item: Product }) => (
              <Product>
                <ProductImage source={{ uri: item.image_url }} />
                <ProductTitleContainer>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPriceContainer>
                    <ProductSinglePrice>
                      {formatValue(item.price)}
                    </ProductSinglePrice>

                    <TotalContainer>
                      <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                      <ProductPrice>
                        {formatValue(item.price * item.quantity)}
                      </ProductPrice>
                    </TotalContainer>
                  </ProductPriceContainer>
                </ProductTitleContainer>
                <ActionContainer>
                  <ActionButton
                    testID={`increment-${item.id}`}
                    onPress={() => increment(item.id)}
                  >
                    <FeatherIcon name="plus" color="#E83F5B" size={16} />
                  </ActionButton>
                  <ActionButton
                    testID={`decrement-${item.id}`}
                    onPress={() => decrement(item.id)}
                  >
                    <FeatherIcon name="minus" color="#E83F5B" size={16} />
                  </ActionButton>
                </ActionContainer>
              </Product>
            )}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 120 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#a0a0b3' }}
            >
              Oops...
            </Text>
            <Text style={{ color: '#a0a0b3' }}>
              Não há produtos no seu carrinho.
            </Text>
          </View>
        )}
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>
          {`${String(totalItensInCart)} itens`}
        </TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
