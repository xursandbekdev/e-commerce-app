import { render, screen, fireEvent } from "@testing-library/react";
import PaginationGlobal from "../../components/paginition";
import type { PaginationGlobalProps } from "../../interface";

describe("PaginationGlobal Component", () => {
    const defaultProps: PaginationGlobalProps = {
        page: 1,
        pageCount: 5,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders pagination when pageCount is greater than 1", () => {
        render(<PaginationGlobal {...defaultProps} />);

        const pagination = screen.getByRole("navigation");
        expect(pagination).toBeInTheDocument();
    });

    it("does not render pagination when pageCount is 1", () => {
        render(<PaginationGlobal {...defaultProps} pageCount={1} />);

        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("does not render pagination when pageCount is 0", () => {
        render(<PaginationGlobal {...defaultProps} pageCount={0} />);

        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("calls onChange when page is clicked", () => {
        const mockOnChange = jest.fn();
        render(<PaginationGlobal {...defaultProps} onChange={mockOnChange} pageCount={5} />);

        const pageButtons = screen.getAllByRole("button");
        const page3Button = pageButtons.find(button => button.textContent === "3");

        if (page3Button) {
            fireEvent.click(page3Button);
            expect(mockOnChange).toHaveBeenCalledWith(3);
        }
    });

    it("renders correct number of pages", () => {
        render(<PaginationGlobal {...defaultProps} pageCount={3} />);
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("handles different pageCount values", () => {
        const { rerender } = render(<PaginationGlobal {...defaultProps} pageCount={10} />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();

        rerender(<PaginationGlobal {...defaultProps} pageCount={1} />);
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("calls onChange with correct value", () => {
        const mockOnChange = jest.fn();
        render(<PaginationGlobal {...defaultProps} onChange={mockOnChange} page={2} pageCount={5} />);

        const allButtons = screen.getAllByRole("button");
        const nextPageButton = allButtons.find(btn => btn.textContent === "4");

        if (nextPageButton) {
            fireEvent.click(nextPageButton);
            expect(mockOnChange).toHaveBeenCalledWith(4);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
        }
    });

    it("renders pagination with current page", () => {
        render(<PaginationGlobal {...defaultProps} page={3} pageCount={5} />);

        const navigation = screen.getByRole("navigation");
        expect(navigation).toBeInTheDocument();

        expect(screen.getByText("3")).toBeInTheDocument();
    });
});