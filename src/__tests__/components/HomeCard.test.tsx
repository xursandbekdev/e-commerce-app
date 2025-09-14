import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeCard from "../../components/homeCard";
import { useGetProductsQuery } from "../../api/apiSlice";
import type { Product } from "../../interface";

jest.mock("../api/apiSlice", () => ({
    useGetProductsQuery: jest.fn(),
}));

const mockProducts: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        stock: 1,
        category: "media",
        isActive: true,
        createdAt: "",
    },
    {
        id: 2,
        name: "Phone",
        price: 800,
        stock: 1,
        category: "media",
        isActive: true,
        createdAt: "",
    },
];

describe("HomeCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useGetProductsQuery as jest.Mock).mockReturnValue({
            data: { data: { content: mockProducts } },
            isLoading: false,
            isError: false,
        });
    });

    it("renders product cards correctly", async () => {
        render(
            <BrowserRouter>
                <HomeCard searchValue="" />
            </BrowserRouter>
        );

        for (const product of mockProducts) {
            // Find the link by accessible name
            const card = await screen.findByRole("link", {
                name: product.name
            });

            // Verify product name is in the card
            expect(within(card).getByText(product.name)).toBeInTheDocument();
        }

        // Verify correct number of product cards
        const productLinks = screen.getAllByRole("link");
        expect(productLinks).toHaveLength(mockProducts.length);
    });

    it("shows skeletons while loading", () => {
        (useGetProductsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(
            <BrowserRouter>
                <HomeCard searchValue="" />
            </BrowserRouter>
        );

        expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
    });

    it("filters products based on searchValue", async () => {
        render(
            <BrowserRouter>
                <HomeCard searchValue="Laptop" />
            </BrowserRouter>
        );

        expect(await screen.findByText("Laptop")).toBeInTheDocument();
        expect(screen.queryByText("Phone")).not.toBeInTheDocument();
    });

    it("shows error message if API fails", () => {
        (useGetProductsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(
            <BrowserRouter>
                <HomeCard searchValue="" />
            </BrowserRouter>
        );

        expect(screen.getByText(/API call error/i)).toBeInTheDocument();
    });
});