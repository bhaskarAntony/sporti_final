import axios from "axios";

const bookService = async (formData, total) =>{
    try {
        const res = await axios.post('http://localhost:5000/api/confrenceHall', {...formData, [total]:total});
        console.log(res.data);
        // Handle success, maybe show a confirmation message
        alert('done')
    } catch (error) {
        console.error('Error:', error);
        // Handle error
        alert('no')
    }
}