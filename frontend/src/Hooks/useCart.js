import { useContext } from "react";
import { CartContext } from "../Context/Cart";

export const useCart = () => {
	const ctx = useContext(CartContext);

	return {
		...ctx,
	};
};
