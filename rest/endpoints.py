import os
import json
import copy
from flask import Blueprint, request, Response, current_app
from pm4py.objects.process_tree import util as process_tree_util
from pm4py.visualization.common.utils import get_base64_from_gviz
from pm4py.algo.filtering.log.attributes import attributes_filter
from pm4py.algo.discovery.inductive import algorithm as inductive_miner
from pm4py.objects.log.importer.csv import factory as csv_importer
from pm4py.objects.log.importer.xes import factory as xes_importer
from pm4py.visualization.process_tree import factory as pt_vis_factory
from util import constants

blueprint = Blueprint('endpoints', __name__)

@blueprint.route('/import', methods=['POST'])
def measurement():
    file = request.files['eventLog']
    file.save(os.path.join(constants.upload_folder, file.filename))
    log = xes_importer.import_log(os.path.join(constants.upload_folder, file.filename))
    tree = inductive_miner.apply_tree(log)
    gviz = pt_vis_factory.apply(tree, parameters={"format": "svg"})
    svg = get_base64_from_gviz(gviz)
    json_dict={"svg":svg.decode('utf-8')}
    extended_process_tree_json = json.dumps(json_dict) 
   
    return Response(extended_process_tree_json, mimetype='application/json', status=200)

