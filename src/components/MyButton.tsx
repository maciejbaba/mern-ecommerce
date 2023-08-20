import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function MyButton(props: ButtonProps) {
  return <button {...props} />;
}

export default MyButton;
