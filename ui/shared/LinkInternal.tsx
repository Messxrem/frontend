import type { LinkProps, FlexProps } from '@chakra-ui/react';
import { Flex, Link } from '@chakra-ui/react';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type { LegacyRef } from 'react';
import React from 'react';

const LinkInternal = ({ isLoading, ...props }: LinkProps & { isLoading?: boolean }, ref: LegacyRef<HTMLAnchorElement>) => {
  if (isLoading) {
    return <Flex alignItems="center" { ...props as FlexProps }>{ props.children }</Flex>;
  }

  if (!props.href) {
    return <Link color="#00E8AF" { ...props } ref={ ref }/>;
  }

  return (
    <NextLink color="#00E8AF" href={ props.href as NextLinkProps['href'] } passHref target={ props.target } legacyBehavior>
      <Link color="#00E8AF" { ...props } ref={ ref }/>
    </NextLink>
  );
};

export default React.memo(React.forwardRef(LinkInternal));
