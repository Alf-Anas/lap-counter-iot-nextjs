import React, { ReactElement, ReactNode, cloneElement, useState } from "react";
import { Button, Modal, ModalProps } from "antd";

type Props = {
    children: ReactNode;
    modalButton: ReactElement;
} & ModalProps;

export default function BasicModal({
    modalButton = <Button type="primary">Open</Button>,
    children,
    ...modalProps
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {cloneElement(modalButton, {
                onClick: showModal,
            })}
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                {...modalProps}
            >
                {children}
            </Modal>
        </>
    );
}
