"use client";

import { useState } from "react";
import { Button } from "./button";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Input } from "./input";
import { Avatar } from "./avatar";
import { FaCloudUploadAlt, FaCalendarAlt } from "react-icons/fa";

import { Calendar } from "./calendar";

export function ModalShowcase() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("23 Mar 2023");

  return (
    <div className="flex flex-wrap gap-6">
      <Button onClick={() => setOpenModal('addProfile')}>Add New Profile (Right Sheet)</Button>
      <Button onClick={() => setOpenModal('uploadCV')} variant="outline">Upload CV (Center)</Button>
      <Button onClick={() => setOpenModal('success')} variant="primary">Success Dialog (Center)</Button>

      {/* Add New Profile (Right Sheet Modal) */}
      <Modal 
        isOpen={openModal === 'addProfile'} 
        onClose={() => setOpenModal(null)} 
        position="right"
      >
        <ModalHeader onClose={() => setOpenModal(null)}>
          <ModalTitle>Add New Profile</ModalTitle>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-6">
          <Input label="First Name" placeholder="First Name" required />
          <Input label="Last Name" placeholder="Last Name" required />
          <Input label="Email Address" placeholder="Email Address" type="email" required />
          
          <div className="relative">
            <Input 
              label="Join Date" 
              value={selectedDate} 
              readOnly 
              onClick={() => setShowDatePicker(!showDatePicker)}
              rightIcon={<FaCalendarAlt className="text-gray-400 cursor-pointer" />}
              required
            />
            {showDatePicker && (
              <div className="absolute right-0 bottom-full mb-2 z-50 shadow-2xl">
                <Calendar 
                  onSelect={(date) => {
                    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
                    setSelectedDate(date.toLocaleDateString('en-GB', options));
                    setShowDatePicker(false);
                  }}
                  onClose={() => setShowDatePicker(false)}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white">Role</label>
            <select className="w-full h-12 px-4 rounded-xl text-body-md bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:border-primary">
              <option>UI/UX Designer</option>
              <option>Frontend Engineer</option>
              <option>Product Manager</option>
            </select>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" className="flex-1 justify-center" onClick={() => setOpenModal(null)}>Cancel</Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={() => setOpenModal(null)}>Create</Button>
        </ModalFooter>
      </Modal>

      {/* Upload CV (Center Modal) */}
      <Modal 
        isOpen={openModal === 'uploadCV'} 
        onClose={() => setOpenModal(null)} 
        position="center"
      >
        <ModalHeader onClose={() => setOpenModal(null)}>
          <ModalTitle>Upload CV</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col gap-4">
            <p className="text-body-sm text-gray-500 mb-2">Please upload the candidate's CV here.</p>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 hover:border-primary transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800/50">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                <FaCloudUploadAlt />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">Drag & Drop here to upload</p>
                <p className="text-xs text-gray-500">or click to select file from your computer</p>
              </div>
              <Button variant="primary" size="sm">Browse Files</Button>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" className="flex-1 justify-center" onClick={() => setOpenModal(null)}>Cancel</Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={() => setOpenModal(null)}>Upload</Button>
        </ModalFooter>
      </Modal>

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white relative z-10">Welcome to HRDashboard!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-body-md max-w-xs mb-4 relative z-10">
            Enjoy the convenience of managing your company's employees!
          </p>
          <Button variant="primary" className="w-full justify-center py-3 bg-[#11131A] hover:bg-gray-900 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 relative z-10" onClick={() => setOpenModal(null)}>
            Let's Go!
          </Button>
        </ModalContent>
      </Modal>

    </div>
  )
}
