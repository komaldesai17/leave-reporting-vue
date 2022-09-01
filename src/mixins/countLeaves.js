export function countLeave(leave, type) {
    let pal = 0, psl = 0, asl = 0, aal = 0, ral = 0, rsl = 0;
    leave.forEach(element => {
        if ((element.status === 'pending') && (element.type === 'Annual')) {
            pal++;
        }
        else if ((element.status === 'pending') && (element.type === 'Sick')) {
            psl++;
        }
        else if ((element.status === 'approved') && (element.type === 'Sick')) {
            asl++;
        } else if ((element.status === 'approved') && (element.type === 'Annual')) {
            aal++;
        }
        else if ((element.status === 'rejected') && (element.type === 'Sick')) {
            rsl++;
        } else if ((element.status === 'rejected') && (element.type === 'Annual')) {
            ral++;
        }

    });

    if (type === 'annualp') {
        return pal
    }
    else if (type === 'annuala') {
        return aal
    }
    else if (type === 'annualr') {
        return ral
    }
    else if (type === 'sickr') {
        return rsl
    }
    else if (type === 'sicka') {
        return asl
    }
    else if (type === 'sickp') {
        return psl
    }
}


export function checkstatuscount(){
    
}

const countMixin = {
    methods: {
        countLeave,
        checkstatuscount
    }
}

export default countMixin;