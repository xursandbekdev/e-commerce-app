import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/homeCard/ProductCard";
import type { Product } from "../../interface";

const mockProduct: Product = {
    id: 1,
    name: "Test Laptop",
    price: 1500000,
    stock: 5,
    category: "electronics",
    isActive: true,
    createdAt: "2024-01-01",
};

describe("ProductCard Component", () => {
    it("renders product information correctly", () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText("Test Laptop")).toBeInTheDocument();

        // Flexible price matcher
        const priceElement = screen.getByText((content) =>
            content.replace(/\s+/g, "").includes("1500000so'm")
        );
        expect(priceElement).toBeInTheDocument();

        const ratingElement = screen.getByRole("img", { name: /5 stars/i });
        expect(ratingElement).toBeInTheDocument();

        expect(screen.getByText("(23)")).toBeInTheDocument();

        expect(screen.getByText("- 50%")).toBeInTheDocument();
    });

    it("renders product image with correct alt text", () => {
        render(<ProductCard product={mockProduct} />);

        const image = screen.getByRole("img", { name: mockProduct.name });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("alt", mockProduct.name);
    });

    it("renders eye icon button", () => {
        render(<ProductCard product={mockProduct} />);

        const eyeButton = screen.getByRole("button");
        expect(eyeButton).toBeInTheDocument();
    });

    it("formats price correctly with Uzbek locale", () => {
        const productWithLargePrice: Product = {
            ...mockProduct,
            price: 12500000,
        };

        render(<ProductCard product={productWithLargePrice} />);

        const priceElement = screen.getByText((content) =>
            content.replace(/\s+/g, "").includes("12500000so'm")
        );
        expect(priceElement).toBeInTheDocument();
    });

    it("renders with different product data", () => {
        const differentProduct: Product = {
            id: 2,
            name: "Gaming Mouse",
            price: 250000,
            stock: 10,
            category: "accessories",
            isActive: true,
            createdAt: "2024-01-15",
        };

        render(<ProductCard product={differentProduct} />);

        expect(screen.getByText("Gaming Mouse")).toBeInTheDocument();

        const priceElement = screen.getByText((content) =>
            content.replace(/\s+/g, "").includes("250000so'm")
        );
        expect(priceElement).toBeInTheDocument();
    });
});
