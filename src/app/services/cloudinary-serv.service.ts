import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import *  as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CloudinaryServService {

  cloudName = environment.cloudinary.cloudName;

  
  
  constructor(private http:HttpClient) {}

  uploadAvatar(value:FormData, apellido:string, dni:string):Observable<any>{
    
    const fileName = `${dni}_${apellido}`
    const signData = (this.signuploadform( fileName, 'avatar_bbdd'));
    value.append('api_key', environment.cloudinary.apiKey)
    value.append("filename_override", fileName);
    value.append("folder", "avatar_bbdd");
    value.append('overwrite', 'true');
    value.append('timestamp', signData.timestamp.toString());
    value.append('upload_preset', environment.cloudinary.uploadPreset)
    value.append('signature', signData.signature);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`, value)
   }


  signuploadform = (name: string, folderName:string ) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const apiSecret = environment.cloudinary.apiSecret
    const paramsToSign = `filename_override=${name}&folder=${folderName}&overwrite=true&timestamp=${timestamp}&upload_preset=${environment.cloudinary.uploadPreset}${apiSecret}`;
    const signature = CryptoJS.SHA1(paramsToSign).toString();
    return { timestamp, signature }
  }

  uploadNewAvatar(value:FormData, apellido:string, dni:string):Observable<any>{
    const fileName = `${dni}_${apellido}`
    value.append('api_key', environment.cloudinary.apiKey)
    value.append("filename_override", fileName);
    value.append("folder", "avatar_bbdd");
    value.append('upload_preset', environment.cloudinary.uploadPresetNewProduct)
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`, value)
   }
  
   uploadCursoAvatar(value:FormData, curso:string):Observable<any>{
    const date=Date.now()

    let cursoName = curso.replace(/\s/g, '_').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    //TESTEAR ESTO
    const fileName = `${cursoName}_${date}`
    const signData = (this.signuploadform( fileName, 'cursos'));
    value.append('api_key', environment.cloudinary.apiKey)
    value.append("filename_override", fileName);
    value.append("folder", "cursos");
    value.append('overwrite', 'true');
    value.append('timestamp', signData.timestamp.toString());
    value.append('upload_preset', environment.cloudinary.uploadPreset)
    value.append('signature', signData.signature);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`, value)
   }

   
   uploadNewProductPhoto(file:FormData):Observable<any>{

    file.append('api_key', environment.cloudinary.apiKey)
    //file.append("folder", "ECommerce_urano");
    file.append('upload_preset', environment.cloudinary.uploadPresetNewProduct)
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`, file)
   }

   }