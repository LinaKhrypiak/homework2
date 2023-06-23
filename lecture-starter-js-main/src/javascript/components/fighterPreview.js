import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (fighter) {
        const imageElement = createFighterImage(fighter);
        const nameElement = "name:" + fighter.name + " ";
        const healthElement = "health:" + fighter.health + " ";
        const attackElement = "attack:" + fighter.attack + " ";
        const defenseElement = "defense:" + fighter.defense + " ";
        console.log("nameElement : ", nameElement)
        fighterElement.style.color = "white";
        fighterElement.append(imageElement, nameElement, document.createElement('br'), healthElement, document.createElement('br'), attackElement, document.createElement('br'), defenseElement);
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
