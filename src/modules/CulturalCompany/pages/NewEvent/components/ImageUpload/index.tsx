import { makePrivateRequest } from 'core/utils/request';
import { useState } from 'react';
import { Image, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './styles.scss';

interface ImgUploadResponse {
  name: string;
  size: number;
  link: string;
}

interface Props {
  onUploadSuccess: (imgUrl: string) => void;
  banner: string;
}

const ImageUpload = ({ onUploadSuccess, banner }: Props) => {

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const bannerUrl = uploadedImgUrl || banner;

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    setUploadProgress(progress);
  }

  const uploadImage = (selectedImage: File) => {
    const payload = new FormData();
    payload.append('file', selectedImage);

    makePrivateRequest<ImgUploadResponse>({
      url: '/files',
      method: 'POST',
      data: payload,
      onUploadProgress
    })
    .then(({ data }) => {
      setUploadedImgUrl(data.link);
      onUploadSuccess(data.link);
    })
    .catch(() => {
      toast.error('Erro ao enviar arquivo.');
    })
    .finally(() => {
      setUploadProgress(0);
    });
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const selectedImage = event.target.files?.[0];

    if (selectedImage) {
      uploadImage(selectedImage);
    }

  }

  return (
    <div className="row">
      <div className="col-5">
        <div className="uploads-button-container">
          <input 
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            hidden 
          />
            <label htmlFor="upload" className="btn btn-secondary button">Adicionar Banner
            </label>
            {uploadProgress > 0 && (<ProgressBar  now={uploadProgress}/>)}         

        </div>
      </div>
      <div className="col-6 upload-placeholder">
        {bannerUrl && uploadProgress === 0 && (
          <a 
            href={bannerUrl} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={bannerUrl}
              className="uploaded-image"
              rounded
            />
          </a>
        )}        
      </div>
    </div>
  );
}

export default ImageUpload;
