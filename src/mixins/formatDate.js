import format from 'date-fns/format';

export function formatDate( isoDateStr, dateFormat = 'indian' ) {
    switch( dateFormat ) {
        case 'standard':
            return format( new Date( isoDateStr ), 'MMM d, yyyy' );
        case 'indian':
            return format( new Date( isoDateStr ), 'dd-MM-yyyy' )
    }
}

const formatDateMixin = {
    methods: {
        formatDate
    }
};

export default formatDateMixin;