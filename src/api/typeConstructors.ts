import * as Entities from "./entities";

const typeConstructors = Object.keys(Entities).reduce((types, key) => {
    if(Entities[key].$Type){
        types[Entities[key].$Type.value] = Entities[key];
    }

    return types;
}, {});

export default typeConstructors;