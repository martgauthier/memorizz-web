import { ConfigService } from "src/services/config-service.service";

export class Niveau{
    constructor(niveau : string, public configService : ConfigService){
        switch (niveau) {
            case "facile":
                configService.setNbCard(3);
                configService.setPosition(false);
                configService.setType(true);
                break;
            case "moyen":
                configService.setNbCard(4);
                configService.setPosition(true);
                configService.setType(true);
                break;
            case "difficile":
                configService.setNbCard(6);
                configService.setPosition(true);
                configService.setType(false);
                break;
        }
    }
}