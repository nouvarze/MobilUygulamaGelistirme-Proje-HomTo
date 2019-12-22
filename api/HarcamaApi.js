import {f} from '../config';

export function harcamaEkle(baslik,ucret,tarih,aciklama="BOS_ACIKLAMA2354"){
    f.firestore()
    .collection('Harcama')
    .add({
        Aciklama:aciklama,
        Kullanici: f.auth().currentUser,
        Tarih:tarih,
        createdAt: f.firestore.FieldValue.serverTimestamp(),
        Ucret:ucret
    })
    .then((data)=>addComplete(data))
    .catch((error)=>console.log(error));
}

export async function getHarcama(){
    var harcamaList=[];

    var snapshot=await f.firestore()
    .collection('Harcama')
    .orderBy('Tarih')
    .get();

    snapshot.forEach((doc)=>{
        harcamaList.push(doc.data());
    })

    //alinanHarcamalar(harcamaList);

    return snapshot;

}