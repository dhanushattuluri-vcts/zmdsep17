import dualLensImg from './duallens.webp';
import dualLensMobileHeroImg from './dual-lens-mobile-hero.webp';
import singleLensImg from './singlelens.webp';
import singleLensMobileHeroImg from './single-lens-mobile-hero.webp';
import edc1Img from './edc-1.webp';
import crodenImg from './croden.webp';
import linecrossImg from './linecross.webp';
import periddeImg from './peridde.webp';
import licpImg from './licp.webp';
import vehiclassImg from './vehiclass.webp';
import vehatriImg from './vehatri.webp';
import facrecogImg from './facrecog.webp';
import genclaImg from './gencla.webp';
import perfaImg from './perfa.webp';
import ppeverImg from './ppever.webp';
import firedeImg from './firede.webp';
import singleLensModelImg from './singlelens_ourmodel.webp';
import dualLensModelImg from './duallens_ourmodel.webp';
import bulletModelImg from './bulletcam.webp';
import headMountModelImg from './headmountcam.webp';
import finalBannerImg from './final_banner.webp';
import dualLensAngle1Img from './duallens_angle1.jpg';
import dualLensAngle2Img from './duallens_angle2.jpg';
import dualLensAngle3Img from './duallens_angle3.jpg';
import singleLensAngle2Img from './singlelens_angle2.webp';
import singleLensAngle3Img from './singlelens_angle3.webp';
import bulletAngle2Img from './bulletcam_angle2.webp';
import bulletAngle3Img from './bulletcam_angle3.webp';
import headMountAngle2Img from './headmountcam_angle2.webp';
import headMountAngle3Img from './headmountcam_angle3.webp';
import dayVisionCamImg from './dayvisioncam.webp';
import nightVisionCamImg from './nightvisioncam.webp';
import camera90DegImg from './90degcam.webp';
import camera110DegImg from './110degcam.webp';
import camera180DegImg from './180degcam.webp';
import waterproofTestImg from './waterproof-test.webp';
import impactTestImg from './impact-test.webp';
import thermalTestImg from './thermal-test.webp';

/**
 * Class dcamImages provides centralized, single-class access to all camera asset images.
 */
export class dcamImages {
  static dualLens = dualLensImg;
  static dualLensMobileHero = dualLensMobileHeroImg;
  static singleLens = singleLensImg;
  static singleLensMobileHero = singleLensMobileHeroImg;
  static edc1 = edc1Img;
  static croden = crodenImg;
  static linecross = linecrossImg;
  static peridde = periddeImg;
  static licp = licpImg;
  static vehiclass = vehiclassImg;
  static vehatri = vehatriImg;
  static facrecog = facrecogImg;
  static gencla = genclaImg;
  static perfa = perfaImg;
  static ppever = ppeverImg;
  static firede = firedeImg;
  static singleLensModel = singleLensModelImg;
  static dualLensModel = dualLensModelImg;
  static bulletModel = bulletModelImg;
  static headMountModel = headMountModelImg;
  static finalBanner = finalBannerImg;
  static dayVisionCam = dayVisionCamImg;
  static nightVisionCam = nightVisionCamImg;
  static camera90Deg = camera90DegImg;
  static camera110Deg = camera110DegImg;
  static camera180Deg = camera180DegImg;
  static waterproofTest = waterproofTestImg;
  static impactTest = impactTestImg;
  static thermalTest = thermalTestImg;
  static dualLensAngles = [
    dualLensAngle1Img,
    dualLensAngle2Img,
    dualLensAngle3Img,
  ];
  static singleLensAngles = [
    singleLensModelImg,
    singleLensAngle2Img,
    singleLensAngle3Img,
  ];
  static bulletAngles = [
    bulletAngle3Img,
    bulletAngle2Img,
    bulletModelImg,
  ];
  static headMountAngles = [
    headMountAngle2Img,
    headMountModelImg,
    headMountAngle3Img,
  ];

  /**
   * Helper to retrieve image URL dynamically by key name
   * @param {string} key 
   * @returns {string|null}
   */
  static get(key) {
    return this[key] || null;
  }
}

export default dcamImages;
