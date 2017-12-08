# Generic Javascript nagyfeladat

## Leírás
> A feladat, hogy készítsetek egy úgynevezett CRUD table modult. 
Ez az alapvető adatkezelési műveleteket valósítja meg:  
* C = create
* R = read
* U = update
* D = delete
  
### HTML oldal
> A HTML felépítésénél legyen fejléc, lábléc és tartalom, szemantikus 
HTML felépítést használjatok. A tartalomban egy szabványos táblázat 
legyen.  
Az oldal stílusának beállításánál használjátok a Bootstrap keretrendszert.

### JAVASCRIPT oldal
* A táblát kezelő logikát különítsétek el a többi script-től és külön 
fájlban helyezzétek el, a module pattern szerint. Minden eljárás, ami a 
tábla adatainak kezelését végzi ebben a modulban legyen megvalósítva.

* __Read__ az alkalmazás betöltése után automatikusan jelenjenek meg 
az adatok a táblázatban. Első alkalommal a "http://139.59.154.132:3000/users" címről töltétek be a táblázat rekordjait. Ezeket tároljátok el a sajátgépen a localStorage használatával és később már innen dolgozzatok. Minden rekord a táblázat egy sora legyen, 
minden sor egy extra sorszám cellával kezdődjön és egy kezelő cellával 
végződjön. Az adott sorokban minden tulajdonság beviteli mezőkben jelenjen meg. A kezelő cellában két gomb legyen ikonnal jelölve, update és 
delete, a színük is legyen különböző. 
* __Update__ az update gombra kattintva eseménykezelőn keresztül frissítsétek az adott sor adatait a táblázatot reprezentáló tömbben és a localStorage -ban is.
* __Delete__ a delete gombra kattintás után eseménykezelőn keresztül töröljétek az adott rekordot a rekordokat tartalmazó tömbből és ennek 
sikeressége esetén töröljétek az adott sort a táblázatból is.
* __Create__ a táblázat első sora speciális sor legyen, amelynek cellái 
üres beviteli mezőket tartalmaznak és a kezelő cellában itt egy gomb 
álljon, a beszúrásra utaló ikonnal és színnel. Amikor adatot viszünk be a 
cellákba és a gombra kattintunk, akkor validáljuk az adatokat és megfelelő 
input esetén mentsük őket a tábla sorait tartalmaző tömbbe, illetve 
frissítsük az adatokat a localStorage -ban is.

### Segítség
* Külön fájlban legyen a dataTable modul és külön fájlban az oldalt 
működtető logika.
* A kezdeti adatokat AJAX segítségével töltsd le a megadott címről.
* Mivel a táblázat sorait dinamikusan kell generálni, érdemes hozzá a 
document.createElement metódust használni.
* OOP szemlélettel dolgozz, külön osztály legyen a táblázatnak (mint 
az előző feladatoknál amikor kezeltük a kollekciót) és külön osztály 
az egyes soroknak.
* Külön osztályt készítsetek a localStorage kezelésére is, hogy átlátható 
legyen a munkátok.
* A közös munkát a Git segítségével valósítsátok meg.
* Érdemes adni egy egyedi azonosítót (lehet random string és számkombináció) az egyes objektumoknak a tömbben. Ezt ha hozzáadjátok egyedi attribútumként a táblázat soraihoz, akkor könnyen tudtok majd hivatkozni 
rájuk a törlésnél és a frissítésnél.