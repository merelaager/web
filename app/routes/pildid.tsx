import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import Email from "~/components/email";
import { JSX } from "react";

interface GalleryPicture {
  file: string;
  width: number;
  height: number;
}

const picturesList: GalleryPicture[] = [
  { file: "Kati_052@1600.webp", width: 1600, height: 1066 },
  { file: "Kati_073@1600.webp", width: 1600, height: 1066 },
  { file: "Kati_171@1600.webp", width: 1600, height: 1066 },
  { file: "Martin_030@1600.webp", width: 1600, height: 919 },
  { file: "Martin_055@1600.webp", width: 1600, height: 904 },
  { file: "Martin_123@1600.webp", width: 1600, height: 1066 },
  { file: "tk_ilmutatud_008@1600.webp", width: 1600, height: 1073 },
  { file: "tk_ilmutatud_059@1600.webp", width: 1600, height: 1073 },
  { file: "Kati_067@1600.webp", width: 1600, height: 1066 },
  { file: "Kati_103@1600.webp", width: 1600, height: 1066 },
  { file: "Martin_023@1600.webp", width: 1600, height: 882 },
  { file: "Martin_032@1600.webp", width: 1600, height: 1106 },
  { file: "Martin_103@1600.webp", width: 1600, height: 1002 },
  { file: "Martin_130@1600.webp", width: 1600, height: 1066 },
  { file: "tk_ilmutatud_054@1600.webp", width: 1600, height: 1073 }
];

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.PILDID, "/pildid") as MetaDescriptor[];
};

export default function PicturesRoute() {
  const pictures: JSX.Element[] = picturesList.map((picture) => (
    <img
      key={picture.file}
      src={`/img/gallery/${picture.file}`}
      width={picture.width}
      height={picture.height}
      loading="lazy"
      alt=""
    />
  ));

  return (
    <main className="pildid">
      <div className="o-container">
        <p>Hetki laagrielust.</p>
        <div className="o-masonry">{pictures}</div>
        <div className="u-banner u-banner--info">
          <p>
            Kui otsite kindla aasta/vahetuse pilte, saatke oma küsimus julgelt
            aadressile <Email username="taaniel" />.
          </p>
        </div>
      </div>
    </main>
  );
}
