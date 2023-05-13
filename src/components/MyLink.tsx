import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

type MyLinkProps = LinkProps & {
  onClick?: (event: React.MouseEvent<HTMLLinkElement, MouseEvent>) => void;
};

const MyLink = (props: MyLinkProps) => {
  return <Link {...props} />;
};

export default MyLink;