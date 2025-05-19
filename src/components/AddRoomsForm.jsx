import react, {useState,useEffect} from "react";


const AddRoomsForm = ({isOpen, onclose, onSubmit, rooms = []}) => {
    const [formData, setFormData] = useState ({
        image: "",
        name: "",
        type: "",
        price: "",
        capacity: "",
    })

    useEffect (() => {
        setFormData({
         image: "",
        name: "",
        type: "",
        price: "",
        capacity: "",
        })
    }, [isOpen])

      const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return(
    <aside></aside>
  )

}


export default AddRoomsForm