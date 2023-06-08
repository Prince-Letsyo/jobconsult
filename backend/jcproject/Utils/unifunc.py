def form_data_to_object(form_data):
    data = {}
    for key, value in form_data.items():
        keys = [k.rstrip("]") for k in key.split("[")]
        temp_obj = data

        for current_key in keys[:-1]:
            if not current_key:
                continue

            if current_key.isdigit():
                if not temp_obj:
                    temp_obj.append({})
                while len(temp_obj) <= int(current_key):
                    temp_obj.append({})
                temp_obj = temp_obj[int(current_key)]
            else:
                if current_key not in temp_obj:
                    next_key = keys[keys.index(current_key) + 1]
                    temp_obj[current_key] = [] if next_key.isdigit() else {}
                temp_obj = temp_obj[current_key]

        last_key = keys[-1]
        if isinstance(temp_obj, list):
            temp_obj.append(value)
        else:
            temp_obj[last_key] = value if value else ""

    return recursively_remove_empty_objects_and_arrays(data)


def recursively_remove_empty_objects_and_arrays(obj):
    for key, value in obj.items():
        if isinstance(value, dict):
            recursively_remove_empty_objects_and_arrays(value)
            if "emptyArray" in value:
                obj[key] = []
            elif not value:
                obj[key] = {}
        elif isinstance(value, list):
            for item in value:
                recursively_remove_empty_objects_and_arrays(item)
            if len(value) == 1 and isinstance(value[0], dict) and not value[0]:
                obj[key] = []
    return obj