import { useForm } from "@inertiajs/react";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export default function Component() {
    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState("center");
    const { data, setData, post, reset } = useForm({
        NamaBarang: "",
        FotoBarang: "",
        HargaBeli: "",
        HargaJual: "",
        Stok: "",
    });

    const handleChanges = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setData(key, value);
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
                reset();
            },
        });
    };

    const handleFileUpload = (e) => {
        const key = e.target.id;
        const value = e.target.files[0];

        setData(key, value);
    };

    return (
        <>
            <Button className="ms-2" onClick={() => setOpenModal(!openModal)}>
                Tambah
            </Button>
            <Modal
                show={openModal}
                position={modalPlacement}
                onClose={() => setOpenModal(!openModal)}
            >
                <Modal.Header>Tambah Product Baru</Modal.Header>
                <Modal.Body>
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="NamaBarang"
                                    value="Nama Barang"
                                />
                            </div>
                            <TextInput
                                onChange={handleChanges}
                                id="NamaBarang"
                                type="text"
                                placeholder="Isi nama barang"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="FotoBarang"
                                    value="Foto Barang"
                                />
                            </div>
                            <FileInput
                                onChange={handleFileUpload}
                                id="FotoBarang"
                                helperText="Pilih foto barang"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="HargaBeli" value="Harga Beli" />
                            </div>
                            <TextInput
                                onChange={handleChanges}
                                id="HargaBeli"
                                type="number"
                                placeholder="Masukkan harga beli"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="HargaJual" value="Harga Jual" />
                            </div>
                            <TextInput
                                onChange={handleChanges}
                                id="HargaJual"
                                type="number"
                                placeholder="Masukkan harga jual"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Stok" value="Stok" />
                            </div>
                            <TextInput
                                onChange={handleChanges}
                                id="Stok"
                                type="number"
                                placeholder="Masukkan stok"
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmission}>Simpan</Button>
                    <Button color="red" onClick={() => setOpenModal(false)}>
                        Batalkan
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
