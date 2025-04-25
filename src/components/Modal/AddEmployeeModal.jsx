import React, { useState,  useEffect, useRef, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../services/firebase";

const AddEmployeeModal = ({isOpen, onClose, employees, setEmployees, getEmployees}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const firstNameRef = useRef(null);

    useEffect(() => {
        if(isOpen && firstNameRef.current) {
            firstNameRef.current.focus();
        }
    }, [isOpen])

    const handleAdd = async (e) => {
        e.preventDefault();

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !address.trim() ||
            !contactNumber.trim()
          ) {
            return Swal.fire({
              icon: "error",
              title: "Error!",
              text: "All fields are required and cannot be empty.",
              showConfirmButton: true,
            });
          }
          
          const trimmedFirstName = firstName.trim();
          const trimmedLastName = lastName.trim();
          const trimmedAddress = address.trim();
          const trimmedContactNumber = contactNumber.trim();
          
          const contactNumberPattern = /^[0-9]{11}$/;
          if (!contactNumberPattern.test(trimmedContactNumber)) {
            if (/\D/.test(trimmedContactNumber)) {
              return Swal.fire({
                icon: "error",
                title: "Invalid Contact Number",
                text: "Contact number must only contain numbers.",
              });
            } else {
              return Swal.fire({
                icon: "error",
                title: "Invalid Contact Number",
                text: "Contact number must be exactly 11 digits.",
              });
            }
          }

        const newEmployee = {
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            address: trimmedAddress,
            contactNumber: trimmedContactNumber,
        }

        employees.push(newEmployee);

        try {
            await addDoc(collection(db, "employees"), {
                ...newEmployee
            })
        } catch (error) {
            console.log(error)
        }

        setEmployees(employees);
        onClose();

        setFirstName('');
        setLastName('');
        setAddress('');
        setContactNumber('');

        getEmployees();

        Swal.fire({
            icon: 'success',
            title: 'Student added successfully!',
            text: `${firstName} ${lastName}'s data has been added.`,
            showConfirmButton: true,
            // timer: 1500,
        })
    }

  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
        className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.30)] "
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
        >
          <h2 className="text-xl font-bold mb-4">Add New Student</h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleAdd}>
            <input
                id="firstName"
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              ref={firstNameRef}
            />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md"
              value={lastName}
              onChange={e => setLastName(e.target.value)}              
            />
            <input
            id="address"
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-md"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full px-4 py-2 border rounded-md"
              id="contactNumber"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
            />

            <div className="flex justify-end mt-6 gap-2">
                <button type="submit">
                    Add
                </button>
              <button
                type="button"   
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </form>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  )
}

export default AddEmployeeModal