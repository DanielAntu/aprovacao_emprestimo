import re
from datetime import datetime


def validation_date(date):
    exp = r'^\d{2}/\d{2}/\d{4}$'
    return bool(re.match(exp, date))


def validation_data(data, key, type_date=False, size_list=None):
    try:
        if not type_date:
            data_validation = float(data[key])
        else:
            data_validation = data[key]
            if not validation_date(data_validation):
                data_validation = ''
            data_nasc = datetime.strptime(data_validation, '%d/%m/%Y')
            date_actually = datetime.now()
            age = date_actually.year - data_nasc.year
            if data_nasc > date_actually:
                age = ''
            
            try:
                if (date_actually.month, date_actually.day) < (data_nasc.month, data_nasc.day):
                    age -= 1
                data_validation = float(age)
            except ValueError:
                data_validation = ''
            except TypeError:
                data_validation = ''

        if size_list is not None:
            if data_validation < 0 or data_validation > size_list - 1:
                data_validation = ''

        return data_validation
    except KeyError:
        return ''
    except ValueError:
        return ''