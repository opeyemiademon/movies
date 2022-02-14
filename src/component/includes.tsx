export const  sortMovies=(a:any,b:any)=>{
    let result = 0;
    if(Number(a.order)>Number(b.order)){
        result = 1
    }else if (Number(a.order)<Number(b.order)){
        result = -1
    }
    return result
    }