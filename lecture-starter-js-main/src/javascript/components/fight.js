
import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over

        console.log("fight is started");

        const firstFighterHealthBar = document.getElementById(`left-fighter-indicator`);
        const secondFighterHealthBar = document.getElementById(`right-fighter-indicator`);

        let makeCriticalHitCombinationFirstFighter = false;
        let makeCriticalHitCombinationSecondFighter = false;

        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;

        let isFirstFighterBlocked = false;
        let isSecondFighterBlocked = false;

        let powerFirstFighter = 0;
        let damageFirstFighter = 0;
        let blockPowerFirstFighter = 0;

        
        let powerSecondFighter = 0;
        let damageSecondFighter = 0;
        let blockPowerSecondFighter = 0;
        
        let key1Pressed = false;
        let key2Pressed = false;
        let key3Pressed = false;

        let key1PressedSecondFighter = false;
        let key2PressedSecondFighter = false;
        let key3PressedSecondFighter = false;

        let lastStrikeTimeFirstFighter = 0;
        let lastStrikeTimeSecondFighter = 0;
        
        function handleStrike(lastStrikeTime) {
            const currentTime = Date.now();
            let criticalHit;
            if (currentTime - lastStrikeTime >= 10000) {
                criticalHit = true;
                lastStrikeTime = currentTime;
                console.log('Hit strike');
            } else {
                criticalHit = false;
                console.log('Wait 10 seconds');
            }
            return [criticalHit, lastStrikeTime];
        }

        document.addEventListener("keydown", function(event) {
            if(!isFirstFighterBlocked){
                blockPowerFirstFighter = 0;
            }

            if(!isSecondFighterBlocked){
                blockPowerSecondFighter = 0;
            }

         if (event.code === controls.PlayerOneCriticalHitCombination[0]) { 
                key1Pressed = true;
              } else if (event.code === controls.PlayerOneCriticalHitCombination[1]) { 
                key2Pressed = true;
              } else if (event.code === controls.PlayerOneCriticalHitCombination[2]) { 
                key3Pressed = true;
        }
        if (key1Pressed && key2Pressed && key3Pressed){
            makeCriticalHitCombinationFirstFighter = true;
            damageSecondFighter = firstFighter.attack * 2;
            let result = handleStrike(lastStrikeTimeFirstFighter);
            let canStrikeHit = result[0];
            console.log("cheking 10 seconds :  ", canStrikeHit)
            lastStrikeTimeFirstFighter = result[1];
            if (canStrikeHit) {
            if (secondFighterHealth > damageSecondFighter){
                secondFighterHealth = secondFighterHealth - damageSecondFighter;
                console.log("secondFighterHealth ",secondFighterHealth)
                }
            else {
                console.log("resolve firstFighter ")
                setTimeout(() => resolve(firstFighter), 1000);
                }  
            } 
            console.log("makeCriticalHitCombination ",makeCriticalHitCombinationFirstFighter)
        }
        else{
            makeCriticalHitCombinationFirstFighter = false;
        }

        // *************************************************************************
        if (event.code === controls.PlayerTwoCriticalHitCombination[0]) { 
            key1PressedSecondFighter = true;
          } else if (event.code === controls.PlayerTwoCriticalHitCombination[1]) { 
            key2PressedSecondFighter = true;
          } else if (event.code === controls.PlayerTwoCriticalHitCombination[2]) { 
            key3PressedSecondFighter = true;
      }
       if (key1PressedSecondFighter && key2PressedSecondFighter && key3PressedSecondFighter){
        makeCriticalHitCombinationSecondFighter = true;
        damageFirstFighter = secondFighter.attack * 2;
        let result = handleStrike(lastStrikeTimeSecondFighter);
        let canStrikeHit = result[0];
        console.log("cheking 10 seconds :  ", canStrikeHit)
        lastStrikeTimeSecondFighter = result[1];
        if (canStrikeHit) {
        if (firstFighterHealth > damageFirstFighter){
                firstFighterHealth = firstFighterHealth - damageFirstFighter;
                }
                else {
                   // resolve(secondFighter); 
                   console.log("resolve secondFighter ")
                   setTimeout(() => resolve(secondFighter), 1000);
            }
        } 
        console.log("makeCriticalHitCombination ",makeCriticalHitCombinationSecondFighter)
    }
    else{
        makeCriticalHitCombinationSecondFighter = false;
    }

        if (event.code === controls.PlayerOneAttack){
            if (!isFirstFighterBlocked) {
                powerFirstFighter = getHitPower(firstFighter);
                console.log("powerFirstFighter ",powerFirstFighter)
                console.log("blockPowerSecondFighter ",blockPowerSecondFighter)
                damageSecondFighter = getDamage(powerFirstFighter,blockPowerSecondFighter);
                if (secondFighterHealth > damageSecondFighter){
                    secondFighterHealth = secondFighterHealth - damageSecondFighter;
                    console.log("secondFighterHealth ",secondFighterHealth)
                    }
                else {
                    console.log("resolve firstFighter ")
                    //resolve(firstFighter); 
                    setTimeout(() => resolve(firstFighter), 1000);
                    }          
                console.log("damageSecondFighter  ",damageSecondFighter)
                if(isSecondFighterBlocked) {isSecondFighterBlocked = false}
            }
            console.log("KeyA");
        }
        if (event.code === controls.PlayerOneBlock){
            isFirstFighterBlocked = true;
            blockPowerFirstFighter = getBlockPower(firstFighter)
            console.log("KeyD");
            if(isSecondFighterBlocked) {isSecondFighterBlocked = false}
        }
        if (event.code === controls.PlayerTwoAttack){
            if (!isSecondFighterBlocked) {
                powerSecondFighter = getHitPower(secondFighter);
                damageFirstFighter = getDamage(powerSecondFighter,blockPowerFirstFighter);
                if (firstFighterHealth > damageFirstFighter){
                firstFighterHealth = firstFighterHealth - damageFirstFighter;
                }
                else {
                   // resolve(secondFighter); 
                   console.log("resolve secondFighter ")
                   setTimeout(() => resolve(secondFighter), 1000);
                }
                if(isFirstFighterBlocked) {isFirstFighterBlocked = false}
            }
            console.log("KeyJ");
        }
        if (event.code === controls.PlayerTwoBlock){
            isSecondFighterBlocked = true;
            blockPowerSecondFighter = getBlockPower(secondFighter);
            console.log("KeyL");
            if(isFirstFighterBlocked) {isFirstFighterBlocked = false}
        }
        let percentWidthFirstFighter = (firstFighterHealth * 100)/ firstFighter.health;
        firstFighterHealthBar.style.width  =  percentWidthFirstFighter + "%";

        let percentWidthSecondFighter = (secondFighterHealth * 100)/ secondFighter.health;
        secondFighterHealthBar.style.width  =  percentWidthSecondFighter + "%";
            });
        document.addEventListener('keyup', function(event) {
                if (event.code === controls.PlayerOneCriticalHitCombination[0]) { 
                    key1Pressed = false;
                  } else if (event.code === controls.PlayerOneCriticalHitCombination[1]) { 
                    key2Pressed = false;
                  } else if (event.code === controls.PlayerOneCriticalHitCombination[2]) { 
                    key3Pressed = false;
                  }
            });
    });
}

export function getDamage(attacker, defender) {
    //return damage
  //  console.log("call getDamage")
    if (attacker < defender) {
        return 0;
    } else {
        const damage = attacker - defender;
        return damage;
    }

}

export function getHitPower(fighter) {
    // return power
  //  console.log("call getHitPower")
    const attack  = fighter.attack;
    const criticalHitChance = Math.random() + 1;
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    // return block power
  //  console.log("call getBlockPower")
    const defense  = fighter.defense;
    const dodgeChance  = Math.random() + 1;
    const blockPower = defense * dodgeChance;
    return blockPower;
}
