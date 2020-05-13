import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

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
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
