import driver from "featured/vehicle-and-driver/driver-form/driver-grid.json"
import group from "featured/user-and-group/group/group-grid.json"
import vehicle from "featured/vehicle-and-driver/vehicle-form/vehicle-grid.json";
import assign from "featured/vehicle-and-driver/assign/assign-grid.json"
import lookup from "featured/settings/lookup/lookup-grid.json"
import merchant from "featured/user-and-group/merchant/merchant-grid.json"
import order from "@core/data/order-grid.json"
import system from "featured/user-and-group/user/system-user-grid.json"
import consumer from "featured/user-and-group/consumer/consumer-grid.json"
import language from "featured/settings/language/language-grid.json"
import type from "featured/vehicle-and-driver/vehicle-type/vehicle-type-grid.json"

export const gridData = {
    driver,
    group,
    vehicle,
    assign,
    lookup,
    merchant,
    order,
    system,
    vehicle_type: type,
    consumer,
    language
};
