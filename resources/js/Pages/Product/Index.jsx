import Modal from "@/Pages/Product/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button, Pagination, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import ModalEdit from "./Components/ModalEdit";
import Swal from "sweetalert2";

export default function Products({ auth, products }) {
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus data ini?",
            showDenyButton: true,
            confirmButtonText: "Hapus",
            denyButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("products.destroy", id), {
                    onSuccess: () => {
                        setFilteredProducts(products.slice(0, 5));
                        Swal.fire("Data berhasil dihapuss!", "", "success");
                    },
                });
            } else if (result.isDenied) {
                Swal.fire("Data batal dihapus!", "", "info");
            }
        });
    };

    useState(() => {
        setFilteredProducts(products.slice(0, 5));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setFilteredProducts(products.slice((page - 1) * 5, page * 5));
    };

    const handleSearch = (e) => {
        const search = e.target.value;

        if (search === "" || search === null) {
            return setFilteredProducts(products.slice(0, 5));
        }

        const filtered = products.filter((product) =>
            product.NamaBarang.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredProducts(filtered);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">
                        <div className="m-3 flex justify-between items-center">
                            <h2 className="text-2xl m-3">Data Product</h2>

                            <div className="flex justify-between items-center">
                                <TextInput
                                    onChange={handleSearch}
                                    placeholder="Cari produk..."
                                />
                                <Modal
                                    show={openModal}
                                    position="center"
                                    onClose={() => setOpenModal(false)}
                                />
                            </div>
                        </div>
                        <Table pagination>
                            <Table.Head>
                                <Table.HeadCell>Nama Barang</Table.HeadCell>
                                <Table.HeadCell>Foto Barang</Table.HeadCell>
                                <Table.HeadCell>Harga Beli</Table.HeadCell>
                                <Table.HeadCell>Harga Jual</Table.HeadCell>
                                <Table.HeadCell>Stok</Table.HeadCell>
                                <Table.HeadCell>Aksi</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {filteredProducts.map((product) => (
                                    <Table.Row
                                        key={product.id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {product.NamaBarang}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {product.FotoBarang !== null ? (
                                                <img
                                                    src={`storage/products/${product.FotoBarang}`}
                                                    className="w-20 h-20 object-cover"
                                                    alt=""
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {product.HargaBeli}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {product.HargaJual}
                                        </Table.Cell>
                                        <Table.Cell>{product.Stok}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center">
                                                <ModalEdit product={product} />
                                                <Button
                                                    className="ms-2"
                                                    variant="danger"
                                                    color="red"
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <div className="flex justify-center items-center mt-5">
                            <Pagination
                                className="flex justify-center items-center flex-col"
                                layout="table"
                                currentPage={currentPage}
                                totalPages={products.length}
                                onPageChange={handlePageChange}
                                previousLabel="Sebelumnya"
                                nextLabel="Berikutnya"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
