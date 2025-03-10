import { FC, useEffect, useState } from "react";
import { useLayout } from "../../../core";
import { ManifestModel } from "../../../../../app/models/Manifest";
import LandingCategoriesSection from "../../../../../app/pages/public/sections/LandingCategoriesSection";

const MegaMenuELearning: FC = () => {
  const [manifest, setManifest] = useState<ManifestModel>({} as ManifestModel);
  const { setLayoutType, setToolbarType } = useLayout();

  useEffect(() => {
    const myInit = async () => {
      const man = await ManifestModel.getItems();
      if (man) setManifest(man);
    };
    myInit();
  }, []);

  var size = 80;
  return (
    <LandingCategoriesSection manifest={manifest} width={size} height={size} />
  );
};

export { MegaMenuELearning };
