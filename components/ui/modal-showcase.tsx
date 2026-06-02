"use client";

import { useState } from "react";
import { Button } from "./button";
import { Modal, ModalContent, UploadCVModal, CreateDepartmentModal, AddProfileDrawer } from "./modal";

export function ModalShowcase() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-6">
      <Button onClick={() => setOpenModal('addProfile')}>Add New Profile (Right Sheet)</Button>
      <Button onClick={() => setOpenModal('uploadCV')} variant="outline">Upload CV (Center)</Button>
      <Button onClick={() => setOpenModal('createDept')} variant="ghost">Create Department (Center)</Button>
      <Button onClick={() => setOpenModal('success')} variant="primary">Success Dialog (Center)</Button>

      {/* Add New Profile (Right Sheet Drawer) */}
      <AddProfileDrawer
        isOpen={openModal === 'addProfile'}
        onClose={() => setOpenModal(null)}
        onCreate={(data) => console.log("Created profile:", data)}
      />

      {/* Upload CV (Center Modal) */}
      <UploadCVModal
        isOpen={openModal === 'uploadCV'}
        onClose={() => setOpenModal(null)}
        onUpload={(file) => console.log("Uploaded file:", file)}
      />

      {/* Create Department (Center Modal) */}
      <CreateDepartmentModal
        isOpen={openModal === 'createDept'}
        onClose={() => setOpenModal(null)}
        onCreate={(data) => console.log("Created department:", data)}
      />

      {/* Welcome Dialog (Center Modal) */}
      <Modal
        isOpen={openModal === 'success'}
        onClose={() => setOpenModal(null)}
        position="center"
      >
        <ModalContent className="flex flex-col items-center justify-center text-center p-12 gap-4 relative overflow-hidden">
          {/* Confetti decoration particles */}
          <div className="absolute top-10 left-16 w-3 h-3 bg-[#FE964A] rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-4 h-2 bg-[#0062FF] rotate-12 rounded"></div>
          <div className="absolute bottom-24 left-20 w-2 h-4 bg-[#8C62FF] -rotate-45 rounded"></div>
          <div className="absolute bottom-20 right-16 w-3 h-3 bg-[#27A376] rounded-full"></div>

          <div className="w-24 h-24 rounded-full bg-[#27A376] border-[8px] border-[#27A376]/20 flex items-center justify-center text-white text-5xl font-light mb-4 shadow-lg shadow-[#27A376]/30 relative z-10">
            *
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white relative z-10">Welcome to Peoplely HR!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-body-md max-w-xs mb-4 relative z-10">
            Enjoy the convenience of managing your company&apos;s employees!
          </p>
          <Button variant="primary" className="w-full justify-center py-3 relative z-10" onClick={() => setOpenModal(null)}>
            Let&apos;s Go!
          </Button>
        </ModalContent>
      </Modal>

    </div>
  )
}
