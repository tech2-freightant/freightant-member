import { Upload } from 'antd'
import React from 'react'

function Fileupload({maxCount, setFilelist}:{maxCount:number, setFilelist:any}) {
  return (
    <Upload
        name='file'
        multiple={false}
        maxCount={1}
        className="upload-0" />
  )
}

export default Fileupload