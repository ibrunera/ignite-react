import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  activeClassName: string;
}

//this component substitutes <Link className={asPath === '/' : styles.active ? ''}>
export function ActiveLink({children, activeClassName, ...rest}:ActiveLinkProps){
  //return a string showing the path ex:'/posts'
  const {asPath} = useRouter();

  const className = asPath === rest.href ? activeClassName : ''
  
  return (
    <Link {...rest}>
      {cloneElement(children, {className})}
    </Link>
  )
}

