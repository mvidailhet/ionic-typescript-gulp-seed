import { MainController } from './main.controller';
import { WebDevTecService } from '../components/webDevTec/webDevTec.service';

describe('controllers', () => {
  let mainController: MainController;

  beforeEach(angular.mock.module('ionicTypescriptGulpSeed'));

  beforeEach(inject(($controller: angular.IControllerService, webDevTec: WebDevTecService) => {
    webDevTec.data = [null, null, null, null, null];
    mainController = $controller('MainController');
  }));

  it('should have a timestamp creation date', () => {
    expect(mainController.creationDate > 0).toBeTruthy();
  });

  it('should define more than 5 awesome things', () => {
    expect(mainController.awesomeThings.length === 5).toBeTruthy();
  });
});
