import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceForm = () => {
  const videoRef = useRef(null);
  const [studentIds, setStudentIds] = useState([]);
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const beepSound = new Audio("/Audios/beepSound.mp3")

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => handleScan(result),
      { preferredCamera: 'environment' }
    );
    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, []);

  const handleScan = (result) => {
    if (result) {
      try {
        const studentId = result.data; // Assuming this is a number
        console.log('Scanned result:', studentId); // Log the scanned result

        // Convert the studentId to a string for comparison
        // const studentIdString = String(studentId);

        // Check if the studentId is not already in the array (also convert existing IDs to string for comparison)
        if (result.data !== null && result.data !== undefined) {
          if (!studentIds.includes(result.data)) {
            setStudentIds((prevData) => [...prevData, result.data]); // Add only if it's not a duplicate
            beepSound.play();
          } else {
            console.log('Duplicate student ID detected:', studentId); // Log if it's a duplicate
          }
        }
      } catch (error) {
        console.error('Error processing scanned result:', error);
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceData = {
      studentIds,
      year: parseInt(year),
      subject,
    };

    // Log the attendance data to the console
    console.log('Submitting attendance data:', attendanceData);

    try {
      const response = await fetch('http://localhost:3000/teacher/markAttendance', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });
      const responseData = await response.json()
      toast.success(responseData.msg);
      toast.error(responseData.error);
      // const result = await response.json();
      // if (response.ok) {
      //   alert('Attendance marked successfully');
      //   // Optionally, reset the form or handle success
      // } else {
      //   alert(`Error: ${result.message}`);
      // }
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  const scannedItems = [];

  studentIds.forEach((id, index) => {
    scannedItems.push(<li key={index}>{id}</li>);
  });

  return (
    <div>
      <div className='text-center mb-5'>
        <b>
          Mark Attendance
        </b>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2'>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className='mb-2 border-2 bg-gray-500'
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className='mb-2 border-2 bg-gray-500'
          />
        </div>

        <div>
          <video ref={videoRef} style={{ width: '100%', border: '1px solid #ccc' }}></video>
        </div>
        {/* <div>
          <h3>Scanned Student Roll Numbers:</h3>
          <div>
            <ul>
              {scannedItems}
            </ul>
          </div>
        </div> */}
        <div className='flex justify-center'>
          <button type="submit" className='bg-blue-500 w-52 h-8 rounded-lg mt-2'>Submit Attendance</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AttendanceForm;
