import { useState } from "react"
import FloatElement from "../../../components/ui/FloatElement"
import { useNews } from "../../news/viewmodel/useNews"
import GenericForm from "../../../components/ui/GenericForm"
import Input from "../../../components/Input"
import SelectImg from "../../../components/SelectImg"
import type { News } from "../../../lib/type"
import EditNews from "../../../components/EditNews"



export default function News() {
  
  const {createN,isLoadingC} = useNews()
  const [show, setShow] = useState(false);

  const [newData, setNewData] = useState<News>({
    content: "",
    image_url: {} as File,
    title: ""
  })
  
  function handleCreate() {
    setShow(false);
    createN(newData);
    setNewData({
      content: "",
      image_url: {} as File,
      title: ""    
    })
  }

  return (
    <>
        <FloatElement
        textBttn="Crear una nueva noticia"
        setShow={setShow}
        show={show}
        >
          <GenericForm
          handleSubmit={handleCreate}
          isLoading={isLoadingC}
          textBttn="Crear novedad"          
          >
              <Input
              idHtml="Titulo"
              labelText="Titulo de la noticia"
              value={newData.title}
              onChange={(val) => setNewData({...newData, title: val})}
              placeholder="ej: nueva..."
              />
              <Input
              idHtml="Contenido"
              labelText="Contenido de la noticia"
              value={newData.content}
              onChange={(val) => setNewData({...newData, content: val})}
              placeholder="ej: hay una nueva novedad..."
              />
              <label className="font-medium">Imagen</label>
              <SelectImg
                  onChange={(file) => setNewData({ ...newData, image_url: file })}
              />

          </GenericForm>
        </FloatElement>
        <EditNews/>
    </>
  )
}
