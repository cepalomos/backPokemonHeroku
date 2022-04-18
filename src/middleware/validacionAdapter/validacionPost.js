const {searchDbTypes} = require('../../adapter/type')


async function verificar(data){
    let error = [];
    const typesDb = await searchDbTypes();
    const typesId = typesDb.map(el=>el.id);
    const [pokemon,types] = data;
    const regex = /^[A-Z]+$/i;
    const {name,life,attack,defense,speed,weight,height} = pokemon;
    if(!regex.test(name)) error.push({message:"El nombre solo acepta letras"});
    if(life<0||life>100) error.push({message:"la vida tiene que estar entre 0 y 100 excluidos"});
    if(attack<0||attack>100) error.push({message:"la fuerza tiene que estar entre 0 y 100 excluidos"});
    if(defense<0||defense>100) error.push({message:"la defensa tiene que estar entre 0 y 100 excluidos"});
    if(speed<0||speed>100) error.push({message:"la velocidad tiene que estar entre 0 y 100 excluidos"});
    if(weight<0||weight>100) error.push({message:"la peso tiene que estar entre 0 y 100 excluidos"});
    if(height<0||height>100) error.push({message:"la altura tiene que estar entre 0 y 100 excluidos"});
    types.forEach(el =>{
        if(!typesId.includes(el)) error.push({message:"valor de typo no incluido en la base de datos"});
    })
    return error;
}

module.exports = {
    verificar
}